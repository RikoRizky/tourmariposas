import { FLOW_COVER_IMAGE, FLOW_PIN_IMAGES } from "./flowImageUrls.js";

export function FlowImages() {
  return (
    <div className="flow">
      <div className="section-text">
        <p>EXPLORE THE BEAUTY</p>
      </div>
      <div className="flow-images">
        {FLOW_PIN_IMAGES.map((src) => (
          <div key={src} className="img">
            <img src={src} alt="" width="550" height="367" decoding="async" />
          </div>
        ))}
        <div className="img cover">
          <img
            src={FLOW_COVER_IMAGE}
            alt=""
            width="1280"
            height="853"
            fetchpriority="high"
            decoding="async"
          />
        </div>
      </div>
    </div>
  );
}
