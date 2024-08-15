export default function SvgLogo() {
  const move = 'M';
  const curve = 'Q';
  const smooth = 'T';

  return (
    <div className="flex h-screen mx-auto w-full">
      <svg width="300" height="300" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="10" width="280" height="210" rx="20" fill="#f0f0f0" />

        <circle cx="150" cy="100" r="70" fill="#3498db" />

        <path
          d={`${move} 150 50 ${curve} 200 75 150 100 ${smooth} 150 150`}
          stroke="#ffffff"
          stroke-width="5"
          fill="none"
        />

        <text
          font-family="Arial"
          font-size="20"
          text-anchor="middle"
          fill="#333333"
          x="150"
          y="200"
        >
          SVG
        </text>
      </svg>
    </div>
  );
}
