import Image from "next/image";
import React from "react";


type PaymentIconProps = {
  alt?: string;
  size?: number; // width and height in px
  className?: string;
};


export const PaymentIcon: React.FC<PaymentIconProps & { src: string }> = ({
  src,
  alt = "icon",
  size = 30,
  className = "",
}) => {
  return (
    <Image
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={className}
      priority={false}
    />
  );
};

export const IconBkash: React.FC<PaymentIconProps> = (props) => (
  <PaymentIcon src={`/paymentImage/bKash.png`}  alt={props.alt ?? "bKash"}  size={700} className={'w-[300px] md:w-[150px] h-[50px]'} />
);
export const IconAmericanExpress: React.FC<PaymentIconProps> = (props) => (
  <PaymentIcon src={`/paymentImage/American_Express.svg`} alt={props.alt ?? "American Express"} size={700} className={'w-[400px] md:w-[150px] h-[42px]'}  />
);
export const IconCityBank: React.FC<PaymentIconProps> = (props) => (
  <PaymentIcon src={`/paymentImage/city_bank.png`} alt={props.alt ?? "City Bank"} size={700} className={'w-[400px] md:w-[150px] h-[70px]'} />
);
export const IconGooglePay: React.FC<PaymentIconProps> = (props) => (
  <PaymentIcon src={`/paymentImage/GooglePay.jpg`} alt={props.alt ?? "Google Pay"} size={700} className={'w-[200px] md:w-[150px] h-[50px]'} />
);
export const IconMasterCard: React.FC<PaymentIconProps> = (props) => (
  <PaymentIcon src={`/paymentImage/Mastercard.jpg`} alt={props.alt ?? "MasterCard"} size={700} className={'w-[500px] md:w-[150px] h-[50px]'} />
);
export const IconMCash: React.FC<PaymentIconProps> = (props) => (
  <PaymentIcon src={`/paymentImage/mCash.png`} alt={props.alt ?? "MCash"} size={700} className={'w-[500px] md:w-[150px] h-[50px]'} />
);
export const IconNadad: React.FC<PaymentIconProps> = (props) => (
  <PaymentIcon src={`/paymentImage/nagad.jpg`} alt={props.alt ?? "Nadad"} size={700} className={'w-[500px] md:w-[150px] h-[50px]'} />
);
export const IconRocket: React.FC<PaymentIconProps> = (props) => (
  <PaymentIcon src={`/paymentImage/rocket.jpg`} alt={props.alt ?? "Rocket"} size={700} className={'w-[500px] md:w-[150px] h-[50px]'} />
);
export const IconSSLCommerce: React.FC<PaymentIconProps> = (props) => (
  <PaymentIcon src={`/paymentImage/SSLCommerz.png`} alt={props.alt ?? "SSL Commerce"} size={700} className={'w-[500px] md:w-[150px] h-[50px]'} />
);
export const IconUnionPay: React.FC<PaymentIconProps> = (props) => (
  <PaymentIcon src={`/paymentImage/UnionPay.png`} alt={props.alt ?? "Union Pay"} size={700} className={'w-[500px] md:w-[150px] h-[70px]'} />
);
export const IconUpay: React.FC<PaymentIconProps> = (props) => (
  <PaymentIcon src={`/paymentImage/UPay.png`} alt={props.alt ?? "UnPay"} size={1000} className={'w-[500px] md:w-[150px] h-[50px]'} />
);
export const IconVisa: React.FC<PaymentIconProps> = (props) => (
  <PaymentIcon src={`/paymentImage/visa.jpg`} alt={props.alt ?? "Visa"} size={700} className={'w-[500px] md:w-[150px] h-[50px]'} />
);


export const paymentIconData = [
    { name: "Visa", icon: IconVisa },
  
  { name: "Nadad", icon: IconNadad },
  { name: "Rocket", icon: IconRocket },
  { name: "bKash", icon: IconBkash },
  // { name: "American Express", icon: IconAmericanExpress },
 
  { name: "Google Pay", icon: IconGooglePay },
  { name: "MasterCard", icon: IconMasterCard },
    { name: "MCash", icon: IconMCash },

  // { name: "SSL Commerce", icon: IconSSLCommerce },
  { name: "Union Pay", icon: IconUnionPay },
  { name: "Upay", icon: IconUpay },
   { name: "City Bank", icon: IconCityBank },


]