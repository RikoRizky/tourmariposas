export function Preloader() {
  // Mengambil base path dari vite.config.js secara otomatis
  const baseUrl = import.meta.env.BASE_URL;

  return (
    <div id="preloader" className="wrapper">
      <div className="svg-container">
        <svg viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid meet">
          <defs>
            <clipPath id="reveal-mask">
              <rect x="940" y="200" width="1000" height="700" />
            </clipPath>
          </defs>
          <rect width="1920" height="1080" fill="#ffffff" />
          <g className="animated-content">
            <image
              /* Menggabungkan base path dengan nama file logo */
              href={`${baseUrl}logobg.png`}
              x="520"
              y="340"
              width="450"
              height="400"
              preserveAspectRatio="xMidYMid meet"
            />
            <line
              className="line-anim"
              x1="960"
              y1="440"
              x2="960"
              y2="620"
              stroke="#111111"
              strokeWidth="3"
            />
            <g clipPath="url(#reveal-mask)">
              <g transform="translate(1000, 530)">
                <g className="text-slide-anim">
                  <text className="text-name" x="0" y="10">
                    Mariposas Tour
                  </text>
                  <text className="text-title" x="5" y="65">
                    Indonesia
                  </text>
                </g>
              </g>
            </g>
          </g>
          <rect className="flash-overlay" width="1920" height="1080" />
        </svg>
      </div>
    </div>
  );
}