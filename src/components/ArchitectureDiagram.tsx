import { useEffect, useMemo, useState } from 'react';
import ELK from 'elkjs/lib/elk.bundled.js';
import { Background, Controls, Handle, MarkerType, Position, ReactFlow, ReactFlowProvider, type Edge, type Node, type NodeProps } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import './ArchitectureDiagram.css';

export type ClaimStatus = 'documented' | 'inferred' | 'speculative';
export const STALE_CLAIM_THRESHOLD_YEARS = 3;
export interface DiagramSource { id: string; title: string; url: string; publishedAt: string; }
export interface DiagramClaim { id: string; statement: string; status: ClaimStatus; confidence?: 'low' | 'medium' | 'high'; asOf: string; rationale?: string; sources: DiagramSource[]; }
export interface DiagramNodeData { id: string; name: string; layer: string; summary: string; why: string; claims: DiagramClaim[]; }
export interface DiagramEdgeData { id: string; from: string; to: string; data: string; mode: 'sync' | 'async'; protocol?: string; claims: DiagramClaim[]; }
export interface DiagramScenario { id: string; title: string; steps: { component: string; flow?: string; text: string }[]; }
export interface DiagramGraph { company: string; nodes: DiagramNodeData[]; edges: DiagramEdgeData[]; scenarios: DiagramScenario[]; }
type NodeStatus = ClaimStatus | 'unverified';
type FlowData = Record<string, unknown> & { node: DiagramNodeData; status: NodeStatus; active: boolean; dimmed: boolean; onSelect: (id: string) => void; };
type FlowNode = Node<FlowData, 'architecture'>;
const elk = new ELK();
const icons: Record<string, string> = { frontend: '◫', api: '↔', service: '⚙', 'data-store': '▣', queue: '⇢', cache: '◌', infrastructure: '▤', pipeline: '↝', monitoring: '◉', platform: '⌘' };

function weakest(claims: DiagramClaim[]): NodeStatus { return claims.some((c) => c.status === 'speculative') ? 'speculative' : claims.some((c) => c.status === 'inferred') ? 'inferred' : claims.some((c) => c.status === 'documented') ? 'documented' : 'unverified'; }
function isStale(asOf: string) {
  const match = /^(\d{4})(?:-(\d{2})(?:-(\d{2}))?)?$/.exec(asOf);
  if (!match) return false;
  const year = Number(match[1]); const month = match[2] ? Number(match[2]) : 12; const day = match[3] ? Number(match[3]) : new Date(Date.UTC(year, month, 0)).getUTCDate();
  const date = new Date(Date.UTC(year, month - 1, day));
  return !Number.isNaN(date.valueOf()) && new Date().getTime() >= Date.UTC(year + STALE_CLAIM_THRESHOLD_YEARS, month - 1, day);
}
function ArchitectureNode({ data }: NodeProps<FlowNode>) {
  const stale = data.node.claims.some((claim) => isStale(claim.asOf));
  return <div className={`architecture-node architecture-node--${data.status}${data.active ? ' architecture-node--active' : ''}${data.dimmed ? ' architecture-node--dimmed' : ''}`}>
    <Handle type="target" position={Position.Left} aria-label={`${data.node.name} input`} />
    <button type="button" className="architecture-node__button" onClick={() => data.onSelect(data.node.id)} aria-label={`${data.node.name}, ${data.node.layer}. Open details.`}>
      <span className="architecture-node__icon" aria-hidden="true">{icons[data.node.layer] ?? '□'}</span><span><span className="architecture-node__name">{data.node.name}</span><span className="architecture-node__layer">{data.node.layer}</span>{stale && <span className="stale-marker">May be outdated</span>}</span>
    </button><Handle type="source" position={Position.Right} aria-label={`${data.node.name} output`} />
  </div>;
}
const nodeTypes = { architecture: ArchitectureNode };
async function layout(nodes: FlowNode[], edges: Edge[]) {
  if (nodes.length < 2) return nodes.map((node) => ({ ...node, position: { x: 0, y: 0 } }));
  const result = await elk.layout({ id: 'diagram', layoutOptions: { 'elk.algorithm': 'layered', 'elk.direction': 'RIGHT', 'elk.spacing.nodeNode': '56', 'elk.layered.spacing.nodeNodeBetweenLayers': '92' }, children: nodes.map((n) => ({ id: n.id, width: 208, height: 92 })), edges: edges.map((e) => ({ id: e.id, sources: [e.source], targets: [e.target] })) });
  return nodes.map((node) => { const found = result.children?.find((child) => child.id === node.id); return { ...node, position: { x: found?.x ?? 0, y: found?.y ?? 0 } }; });
}
function Claims({ claims, documentedOnly }: { claims: DiagramClaim[]; documentedOnly: boolean }) {
  const visible = claims.filter((claim) => !documentedOnly || claim.status === 'documented');
  if (!visible.length) return <p>No documented claims are available for this component.</p>;
  return <ul className="claim-list">{visible.map((claim) => <li key={claim.id}><p><span className={`claim-status claim-status--${claim.status}`}>{claim.status}</span>{isStale(claim.asOf) && <span className="stale-badge">May be outdated</span>} {claim.statement}</p><p className="claim-meta">As of {claim.asOf}{claim.confidence ? ` · ${claim.confidence} confidence` : ''}</p>{claim.rationale && <p><strong>Rationale:</strong> {claim.rationale}</p>}{claim.sources.length > 0 && <ul className="claim-sources">{claim.sources.map((source) => <li key={source.id}><a href={source.url} target="_blank" rel="noopener noreferrer">{source.title} ({source.publishedAt})</a></li>)}</ul>}</li>)}</ul>;
}
function Canvas({ graph }: { graph: DiagramGraph }) {
  if (!graph.nodes.length) return <section className="diagram-shell" aria-label={`${graph.company} architecture diagram`}><div className="diagram-canvas diagram-empty"><p>No diagram data yet.</p></div></section>;
  const initial = useMemo(() => { const query = new URLSearchParams(window.location.search); const node = query.get('node'); const scenario = query.get('scenario'); const selectedScenario = graph.scenarios.find((item) => item.id === scenario); return { documented: query.get('documented') === '1', node: graph.nodes.some((item) => item.id === node) ? node : null, scenario: selectedScenario?.id ?? '', step: selectedScenario ? Math.max(0, Math.min(selectedScenario.steps.length - 1, Number(query.get('step') ?? '1') - 1 || 0)) : 0 }; }, [graph]);
  const [documentedOnly, setDocumentedOnly] = useState(initial.documented); const [selectedNodeId, setSelectedNodeId] = useState<string | null>(initial.node); const [scenarioId, setScenarioId] = useState(initial.scenario); const [stepIndex, setStepIndex] = useState(initial.step); const [nodes, setNodes] = useState<FlowNode[]>([]); const [edges, setEdges] = useState<Edge[]>([]); const [ready, setReady] = useState(false); const [copied, setCopied] = useState(false);
  const scenario = graph.scenarios.find((item) => item.id === scenarioId); const step = scenario?.steps[stepIndex];
  const visible = useMemo(() => { const nodes = documentedOnly ? graph.nodes.filter((node) => node.claims.some((claim) => claim.status === 'documented')) : graph.nodes; const ids = new Set(nodes.map((node) => node.id)); return { nodes, edges: graph.edges.filter((edge) => ids.has(edge.from) && ids.has(edge.to) && (!documentedOnly || edge.claims.some((claim) => claim.status === 'documented'))) }; }, [documentedOnly, graph]);
  useEffect(() => { const query = new URLSearchParams(); if (selectedNodeId) query.set('node', selectedNodeId); if (scenarioId) { query.set('scenario', scenarioId); query.set('step', String(stepIndex + 1)); } if (documentedOnly) query.set('documented', '1'); const suffix = query.toString(); window.history.replaceState(null, '', `${window.location.pathname}${suffix ? `?${suffix}` : ''}`); }, [documentedOnly, scenarioId, selectedNodeId, stepIndex]);
  useEffect(() => { const onKey = (event: KeyboardEvent) => { if (!scenario || (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight')) return; event.preventDefault(); setStepIndex((current) => Math.max(0, Math.min(scenario.steps.length - 1, current + (event.key === 'ArrowRight' ? 1 : -1)))); }; window.addEventListener('keydown', onKey); return () => window.removeEventListener('keydown', onKey); }, [scenario]);
  useEffect(() => { let cancelled = false; setReady(false); const activeNode = step?.component; const activeEdge = step?.flow; const flowEdges: Edge[] = visible.edges.map((edge) => ({ id: edge.id, source: edge.from, target: edge.to, label: weakest(edge.claims) === 'unverified' ? 'unverified' : `${edge.data} · ${edge.mode}${edge.protocol ? ` · ${edge.protocol}` : ''}`, sourcePosition: Position.Right, targetPosition: Position.Left, markerEnd: { type: MarkerType.ArrowClosed }, className: `architecture-edge architecture-edge--${weakest(edge.claims)}${scenario ? edge.id === activeEdge ? ' architecture-edge--active' : ' architecture-edge--dimmed' : ''}` })); const flowNodes: FlowNode[] = visible.nodes.map((node) => ({ id: node.id, type: 'architecture', position: { x: 0, y: 0 }, data: { node, status: weakest(node.claims), active: scenario ? node.id === activeNode : false, dimmed: Boolean(scenario && node.id !== activeNode), onSelect: setSelectedNodeId } })); void layout(flowNodes, flowEdges).catch(() => flowNodes).then((result) => { if (!cancelled) { setNodes(result); setEdges(flowEdges); setReady(true); } }); return () => { cancelled = true; }; }, [scenario, step, visible]);
  const selected = graph.nodes.find((node) => node.id === selectedNodeId); const stepNode = graph.nodes.find((node) => node.id === step?.component); const hiddenStep = Boolean(stepNode && !visible.nodes.some((node) => node.id === stepNode.id));
  const copy = async () => { await navigator.clipboard?.writeText(window.location.href); setCopied(true); };
  return <section className="diagram-shell" aria-label={`${graph.company} architecture diagram`}><div className="diagram-toolbar"><label className="diagram-toggle"><input type="checkbox" checked={documentedOnly} onChange={(event) => setDocumentedOnly(event.target.checked)} />Documented only</label><div className="diagram-legend" aria-label="Provenance legend"><span><i className="legend-line" /> Documented</span><span><i className="legend-line legend-line--inferred" /> Inferred</span><span><i className="legend-line legend-line--speculative" /> Speculative / unverified</span></div></div>
    <aside className="scenario-panel" aria-labelledby="scenario-title"><div className="diagram-detail__header"><h2 id="scenario-title">Scenario walkthrough</h2><button type="button" onClick={() => void copy()}>{copied ? 'Copied' : 'Copy link'}</button></div><label>Choose a scenario<select value={scenarioId} onChange={(event) => { setScenarioId(event.target.value); setStepIndex(0); }}><option value="">No scenario selected</option>{graph.scenarios.map((item) => <option key={item.id} value={item.id}>{item.title}</option>)}</select></label>{scenario && <div><p>Step {stepIndex + 1} of {scenario.steps.length}</p>{hiddenStep ? <p className="scenario-note">This step’s component is hidden by Documented only.</p> : <><p>{step?.text}</p>{stepNode && <Claims claims={stepNode.claims} documentedOnly={documentedOnly} />}</>}<div className="scenario-actions"><button type="button" disabled={stepIndex === 0} onClick={() => setStepIndex((value) => value - 1)}>Previous</button><button type="button" disabled={stepIndex === scenario.steps.length - 1} onClick={() => setStepIndex((value) => value + 1)}>Next</button></div></div>}</aside>
    <div className="diagram-and-panel"><div className="diagram-canvas" aria-busy={!ready}>{ready ? <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes} fitView fitViewOptions={{ padding: .18 }} nodesFocusable edgesFocusable minZoom={.35} aria-label="Interactive architecture diagram"><Background gap={20} size={1} /><Controls showInteractive={false} /></ReactFlow> : <p className="diagram-loading">Laying out architecture diagram…</p>}</div>{selected && <aside className="diagram-detail" aria-labelledby="detail-title"><div className="diagram-detail__header"><div><p className="diagram-detail__eyebrow">{selected.layer}</p><h2 id="detail-title">{selected.name}</h2></div><button type="button" onClick={() => setSelectedNodeId(null)}>Close</button></div><p>{selected.summary}</p><h3>Why it exists</h3><p>{selected.why}</p><h3>Claims</h3><Claims claims={selected.claims} documentedOnly={documentedOnly} /></aside>}</div></section>;
}
export default function ArchitectureDiagram({ graph }: { graph: DiagramGraph }) { return <ReactFlowProvider><Canvas graph={graph} /></ReactFlowProvider>; }
