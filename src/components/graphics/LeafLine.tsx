interface LeafLineProps {
  className?: string;
}

export function LeafLine({
  className = "",
}: LeafLineProps) {
  return (
    <svg
      viewBox="0 0 320 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M35 285C90 232 143 168 177 80"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      <path
        d="M76 245C47 222 39 188 43 159C76 166 98 191 101 221"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M112 205C83 180 82 145 91 118C121 131 137 157 136 184"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M146 153C128 124 136 91 153 69C178 89 185 119 170 145"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M73 245C81 249 89 255 96 264"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.6"
      />

      <path
        d="M112 205C120 209 129 216 136 224"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.6"
      />

      <path
        d="M146 153C155 158 161 165 166 174"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.6"
      />

      <path
        d="M177 80C188 58 204 40 225 25"
        stroke="#568477"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      <path
        d="M202 59C215 39 241 33 262 39C251 61 228 72 208 68"
        stroke="#568477"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}