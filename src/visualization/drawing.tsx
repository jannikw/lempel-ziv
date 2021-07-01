const TARGET_COLOR = "#E1BE6A";
const SOURCE_COLOR = "#40B0A6";

export function SharedDefinitions() {
  return (
    <defs>
      <marker
        id="arrowhead"
        markerWidth="100"
        markerHeight="7"
        refX="9"
        refY="3.5"
        orient="auto"
      >
        <polygon points="0 0, 10 3.5, 0 7" />
      </marker>

      <linearGradient id="split-color" gradientTransform="rotate(45)">
        <stop offset="75%" stopColor={TARGET_COLOR} />
        <stop offset="75%" stopColor={SOURCE_COLOR} />
      </linearGradient>
    </defs>
  );
}

export interface ArrowProps {
  x1: number;
  x2: number;
  y: number;
}

export function Arrow(props: ArrowProps) {
  const { x1, x2, y } = props;
  const l = x2 - x1;
  return (
    <path
      d={`M ${x1} ${y} v -20 h ${l} v 19`}
      markerEnd="url(#arrowhead)"
      stroke="black"
      fill="none"
    />
  );
}

export interface ArrowProps2 {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  straight?: boolean;
}

export function Arrow2(props: ArrowProps2) {
  const { x1, y1, x2, y2, straight } = props;

  if (straight) {
    const v1 = y1 < y2 ? 10 : -10;
    const v2 = y1 < y2 ? 20 : -20;

    return (
      <path
        d={`M ${x1} ${y1} v ${v1} L ${x2} ${y2 - 20} v ${v2}`}
        markerEnd="url(#arrowhead)"
        stroke="black"
        fill="none"
      />
    );
  } else {
    const l = x2 - x1;
    const h = (y2 - y1) / 2;

    const v1 = y2 < y1 ? h : -h;
    const v2 = y2 < y1 ? h : -h;
    return (
      <path
        d={`m ${x1} ${y1} v ${v1} h ${l} v ${v2}`}
        markerEnd="url(#arrowhead)"
        stroke="black"
        fill="none"
      />
    );
  }
}

export type CharacterColor = "none" | "source" | "target" | "source-target";

export interface CharacterProps {
  x: number;
  y: number;
  w?: number;
  h?: number;
  text: string;
  color?: CharacterColor;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export function Character(props: CharacterProps) {
  const { x, y, text, color } = props;
  const w = props.w || 30;
  const h = props.h || 30;
  const fill =
    color === "source"
      ? SOURCE_COLOR
      : color === "target"
      ? TARGET_COLOR
      : color === "source-target"
      ? "url(#split-color)"
      : "none";
  return (
    <>
      <rect x={x} y={y} width={w} height={h} fill={fill} stroke="black" />
      <foreignObject
        x={x}
        y={y}
        width={w}
        height={h}
        onMouseEnter={props.onMouseEnter}
        onMouseLeave={props.onMouseLeave}
      >
        <div
          style={{
            //   width: "30px",
            //   height: "30px",
            overflowY: "auto",
            textAlign: "center",
            verticalAlign: "middle",
            lineHeight: `${h}px`,
            userSelect: "none",
          }}
        >
          {text}
        </div>
      </foreignObject>
    </>
  );
}

export interface CurlyBraceProps {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  w: number;
  q: number;
}

export function CurlyBrace(props: CurlyBraceProps) {
  const { x1, y1, x2, y2, w, q } = props;
  var dx = x1 - x2;
  var dy = y1 - y2;
  var len = Math.sqrt(dx * dx + dy * dy);
  dx = dx / len;
  dy = dy / len;

  //Calculate Control Points of path,
  const qx1 = x1 + q * w * dy;
  const qy1 = y1 - q * w * dx;
  const qx2 = x1 - 0.25 * len * dx + (1 - q) * w * dy;
  const qy2 = y1 - 0.25 * len * dy - (1 - q) * w * dx;
  const tx1 = x1 - 0.5 * len * dx + w * dy;
  const ty1 = y1 - 0.5 * len * dy - w * dx;
  const qx3 = x2 + q * w * dy;
  const qy3 = y2 - q * w * dx;
  const qx4 = x1 - 0.75 * len * dx + (1 - q) * w * dy;
  const qy4 = y1 - 0.75 * len * dy - (1 - q) * w * dx;

  const path = `M ${x1} ${y1} Q ${qx1} ${qy1} ${qx2} ${qy2} T ${tx1} ${ty1} M ${x2} ${y2} Q ${qx3} ${qy3} ${qx4} ${qy4} T ${tx1} ${ty1}`;

  return <path d={path} stroke="black" fill="none"></path>;
}

export interface PhraseDisplayProps {
  x: number;
  y: number;
  l: number;
  text: string;
  w?: number;
}

export function PhraseDisplay(props: PhraseDisplayProps) {
  const { x, y, l, text } = props;
  if (l === 1) {
    return (
      <foreignObject x={x - 20} y={y} width="60" height="40">
        <div
          style={{
            //   width: "30px",
            //   height: "30px",
            overflowY: "auto",
            textAlign: "center",
            verticalAlign: "middle",
            lineHeight: "40px",
            userSelect: "none",
            transform: "rotate(-45deg)",
          }}
        >
          {text}
        </div>
      </foreignObject>
    );
  } else {
    const x1 = x + 3;
    const x2 = x + l * 30 - 3;
    const w = props.w ?? 50;
    return (
      <>
        <CurlyBrace x1={x1} x2={x2} y1={y} y2={y} w={10} q={0.6}></CurlyBrace>
        <foreignObject
          x={x1 + Math.abs(x2 - x1) / 2 - w / 2}
          y={y}
          width={w}
          height="40"
        >
          <div
            style={{
              //   width: "30px",
              //   height: "30px",
              overflowY: "auto",
              textAlign: "center",
              verticalAlign: "middle",
              lineHeight: "40px",
              userSelect: "none",
            }}
          >
            {text}
          </div>
        </foreignObject>
      </>
    );
  }
}

export interface ShortPhraseProps {
  x: number;
  y: number;
  text: string;
}

export function ShortPhrase(props: ShortPhraseProps) {
  const { x, y, text } = props;
  return (
    <foreignObject x={x} y={y} width="60" height="40">
      <div
        style={{
          //   width: "30px",
          //   height: "30px",
          overflowY: "auto",
          textAlign: "center",
          verticalAlign: "middle",
          lineHeight: "40px",
          userSelect: "none",
          transform: "rotate(-45deg)",
        }}
      >
        {text}
      </div>
    </foreignObject>
  );
}

export interface CopyingPhraseProps {
  x1: number;
  x2: number;
  y: number;
  p: number;
  l: number;
  w?: number;
}

export function CopyingPhrase(props: CopyingPhraseProps) {
  const { x1, x2, y, p, l } = props;
  const w = props.w ?? 50;

  return (
    <>
      <CurlyBrace x1={x1} x2={x2} y1={y} y2={y} w={10} q={0.6}></CurlyBrace>
      <foreignObject
        x={x1 + Math.abs(x2 - x1) / 2 - w / 2}
        y={y}
        width={w}
        height="40"
      >
        <div
          style={{
            //   width: "30px",
            //   height: "30px",
            overflowY: "auto",
            textAlign: "center",
            verticalAlign: "middle",
            lineHeight: "40px",
            userSelect: "none",
          }}
        >
          {`(${p}, ${l})`}
        </div>
      </foreignObject>
    </>
  );
}
