"use client";

import Image from "next/image";

export function SocialFloat() {
  return (
    <div className="social-float">
      <a
        className="social-btn ig"
        href="https://www.instagram.com/digitalcaricaturesbg/"
        target="_blank"
        rel="noreferrer"
      >
        <Image
          src="/instalogo.png"
          alt="Instagram"
          width={28}
          height={28}
        />
      </a>

      <a
        className="social-btn fb"
        href="https://www.facebook.com/digitalcaricaturesbg"
        target="_blank"
        rel="noreferrer"
      >
        <Image
          src="/fblogo.png"
          alt="Facebook"
          width={28}
          height={28}
        />
      </a>
    </div>
  );
}