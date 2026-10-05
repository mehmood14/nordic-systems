import { useEffect, useMemo, useState } from 'react';
import ELK from 'elkjs/lib/elk.bundled.js';
import {
  Background,
  Controls,
  Handle,
  MarkerType,
  Position,
  ReactFlow,
  ReactFlowProvider,
  type Edge,
  type Node,
  type NodeProps,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import './ArchitectureDiagram.css';

export type ClaimStatus = 'documented' | 'inferred' | 'speculative';

export interface DiagramSource {
  id: string;
  title: string;
  url: string;
  publishedAt: string;
}

export interface DiagramClaim {
  id: string;
  statement: string;
  status: ClaimStatus;
  confidence?: 'low' | 'medium' | 'high';
  asOf: string;
  rationale?: string;
  sources: DiagramSource[];
}

export interface DiagramNodeData {
  id: string;
  name: string;
  layer: string;
  summary: string;
  why: string;
  claims: DiagramClaim[];
}

export interface DiagramEdgeData {
  id: string;
  from: string;
  to: string;
  data: string;
  mode: 'sync' | 'async';
  protocol?: string;
  claims: DiagramClaim[];
}

export interface DiagramGraph {
  company: string;
  nodes: DiagramNodeData[];
  edges: DiagramEdgeData[];
}

type DiagramFlowNodeData = Record<string, unknown> & {
  node: DiagramNodeData;
  status: NodeStatus;
  onSelect: (id: string) => void;
};

type DiagramFlowNode = Node<DiagramFlowNodeData, 'architecture'>;
type NodeStatus = ClaimStatus | 'unverified';

const elk = new ELK();

const layerIcons: Record<string, string> = {
  frontend: '◫',
  api: '↔',
  service: '⚙',
  'data-store': '▣',
  queue: '⇢',
  cache: '◌',
  infrastructure: '▤',
  pipeline: '↝',
  monitoring: '◉',
  platform: '⌘',
};

function weakestStatus(claims: DiagramClaim[]): NodeStatus {
  if (claims.some((claim) => claim.status === 'speculative')) return 'speculative';
  if (claims.some((claim) => claim.status === 'inferred')) return 'inferred';
  if (claims.some((claim) => claim.status === 'documented')) return 'documented';
  return 'unverified';
}

function statusDescription(status: NodeStatus) {
  if (status === 'documented') return 'Documented only';
  if (status === 'inferred') return 'Includes inferred claims';
  if (status === 'speculative') return 'Includes speculative claims';
  return 'Unverified';
}

function ArchitectureNode({ data }: NodeProps<DiagramFlowNode>) {
  const { node, onSelect, status } = data;

  return (
    <div
      className={`architecture-node architecture-node--${status} architecture-node--${node.layer}`}
    >
      <Handle type="target" position={Position.Left} aria-label={`${node.name} input`} />
      <button
        type="button"
        className="architecture-node__button"
        onClick={() => onSelect(node.id)}
        aria-label={`${node.name}, ${node.layer}, ${statusDescription(status)}. Open details.`}
      >
        <span className="architecture-node__icon" aria-hidden="true">{layerIcons[node.layer] ?? '□'}</span>
        <span>
          <span className="architecture-node__name">{node.name}</span>
          <span className="architecture-node__layer">{node.layer}</span>
        </span>
      </button>
      <Handle type="source" position={Position.Right} aria-label={`${node.name} output`} />
    </div>
  );
}

const nodeTypes = { architecture: ArchitectureNode };

async function layoutGraph(nodes: DiagramFlowNode[], edges: Edge[]): Promise<DiagramFlowNode[]> {
  const layout = await elk.layout({
    id: 'architecture',
    layoutOptions: {
      'elk.algorithm': 'layered',
      'elk.direction': 'RIGHT',
      'elk.spacing.nodeNode': '56',
      'elk.layered.spacing.nodeNodeBetweenLayers': '92',
    },
    children: nodes.map((node) => ({ id: node.id, width: 208, height: 92 })),
    edges: edges.map((edge) => ({ id: edge.id, sources: [edge.source], targets: [edge.target] })),
  });

  return nodes.map((node) => {
    const positioned = layout.children?.find((child) => child.id === node.id);
    return {
      ...node,
      position: { x: positioned?.x ?? 0, y: positioned?.y ?? 0 },
    };
  });
}

function ArchitectureDiagramCanvas({ graph }: { graph: DiagramGraph }) {
  const [documentedOnly, setDocumentedOnly] = useState(false);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [nodes, setNodes] = useState<DiagramFlowNode[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [isLayoutReady, setIsLayoutReady] = useState(false);

  const visibleGraph = useMemo(() => {
    const nodesForView = documentedOnly
      ? graph.nodes.filter((node) => node.claims.some((claim) => claim.status === 'documented'))
      : graph.nodes;
    const nodeIds = new Set(nodesForView.map((node) => node.id));
    const edgesForView = graph.edges.filter((edge) => {
      const endpointsAreVisible = nodeIds.has(edge.from) && nodeIds.has(edge.to);
      return endpointsAreVisible && (!documentedOnly || edge.claims.some((claim) => claim.status === 'documented'));
    });

    return { nodes: nodesForView, edges: edgesForView };
  }, [documentedOnly, graph]);

  useEffect(() => {
    if (selectedNodeId && !visibleGraph.nodes.some((node) => node.id === selectedNodeId)) {
      setSelectedNodeId(null);
    }
  }, [selectedNodeId, visibleGraph.nodes]);

  useEffect(() => {
    let cancelled = false;
    setIsLayoutReady(false);

    const flowEdges: Edge[] = visibleGraph.edges.map((edge) => {
      const status = weakestStatus(edge.claims);
      const label = status === 'unverified'
        ? 'unverified'
        : `${edge.data} · ${edge.mode}${edge.protocol ? ` · ${edge.protocol}` : ''}`;
      return {
        id: edge.id,
        source: edge.from,
        target: edge.to,
        label,
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
        className: `architecture-edge architecture-edge--${status}`,
        markerEnd: { type: MarkerType.ArrowClosed },
        ariaLabel: `${edge.from} to ${edge.to}: ${label}`,
      };
    });
    const flowNodes: DiagramFlowNode[] = visibleGraph.nodes.map((node) => ({
      id: node.id,
      type: 'architecture',
      position: { x: 0, y: 0 },
      data: { node, status: weakestStatus(node.claims), onSelect: setSelectedNodeId },
    }));

    void layoutGraph(flowNodes, flowEdges).then((positionedNodes) => {
      if (!cancelled) {
        setNodes(positionedNodes);
        setEdges(flowEdges);
        setIsLayoutReady(true);
      }
    });

    return () => { cancelled = true; };
  }, [visibleGraph]);

  const selectedNode = graph.nodes.find((node) => node.id === selectedNodeId) ?? null;
  const visibleClaims = selectedNode?.claims.filter((claim) => !documentedOnly || claim.status === 'documented') ?? [];

  return (
    <section className="diagram-shell" aria-label={`${graph.company} architecture diagram`}>
      <div className="diagram-toolbar">
        <label className="diagram-toggle">
          <input
            type="checkbox"
            checked={documentedOnly}
            onChange={(event) => setDocumentedOnly(event.target.checked)}
          />
          Documented only
        </label>
        <div className="diagram-legend" aria-label="Provenance legend">
          <span><i className="legend-line legend-line--documented" aria-hidden="true" /> Documented</span>
          <span><i className="legend-line legend-line--inferred" aria-hidden="true" /> Inferred</span>
          <span><i className="legend-line legend-line--speculative" aria-hidden="true" /> Speculative / unverified</span>
        </div>
      </div>

      <div className="diagram-and-panel">
        <div className="diagram-canvas" aria-busy={!isLayoutReady}>
          {isLayoutReady ? (
            <ReactFlow
              nodes={nodes}
              edges={edges}
              nodeTypes={nodeTypes}
              fitView
              fitViewOptions={{ padding: 0.18 }}
              nodesFocusable
              edgesFocusable
              minZoom={0.35}
              aria-label="Interactive architecture diagram"
            >
              <Background gap={20} size={1} />
              <Controls showInteractive={false} />
            </ReactFlow>
          ) : <p className="diagram-loading">Laying out architecture diagram…</p>}
        </div>

        {selectedNode && (
          <aside className="diagram-detail" aria-labelledby="detail-title">
            <div className="diagram-detail__header">
              <div>
                <p className="diagram-detail__eyebrow">{selectedNode.layer}</p>
                <h2 id="detail-title">{selectedNode.name}</h2>
              </div>
              <button type="button" onClick={() => setSelectedNodeId(null)} aria-label="Close component details">Close</button>
            </div>
            <p>{selectedNode.summary}</p>
            <h3>Why it exists</h3>
            <p>{selectedNode.why}</p>
            <h3>Claims</h3>
            {visibleClaims.length > 0 ? (
              <ul className="claim-list">
                {visibleClaims.map((claim) => (
                  <li key={claim.id}>
                    <p><span className={`claim-status claim-status--${claim.status}`}>{claim.status}</span> {claim.statement}</p>
                    <p className="claim-meta">As of {claim.asOf}{claim.confidence ? ` · ${claim.confidence} confidence` : ''}</p>
                    {claim.rationale && <p><strong>Rationale:</strong> {claim.rationale}</p>}
                    {claim.sources.length > 0 && (
                      <ul className="claim-sources" aria-label={`Sources for ${claim.statement}`}>
                        {claim.sources.map((source) => (
                          <li key={source.id}>
                            <a href={source.url} target="_blank" rel="noopener noreferrer">
                              {source.title} ({source.publishedAt})
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            ) : <p>No documented claims are available for this component.</p>}
          </aside>
        )}
      </div>
    </section>
  );
}

export default function ArchitectureDiagram({ graph }: { graph: DiagramGraph }) {
  return (
    <ReactFlowProvider>
      <ArchitectureDiagramCanvas graph={graph} />
    </ReactFlowProvider>
  );
}
