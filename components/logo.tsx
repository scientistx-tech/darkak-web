import Image from "next/image";
export function Logo() {
  return (
    <div className="relative h-20 w-full">
      <Image
        src="/images/logo/brandLogo.png"
        fill
        className="object-fill"
        alt="NextAdmin logo"
        role="presentation"
        quality={100}
      />
    </div>
  );
}
