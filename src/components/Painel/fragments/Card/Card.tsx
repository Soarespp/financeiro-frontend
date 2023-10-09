import Image from "next/image";

interface propsCard {
  title: string;
  img: any;
  width?: number;
  height?: number;
  onClick?: () => void;
}

const Card = ({
  title,
  img,
  width = 100,
  height = 120,
  onClick,
}: propsCard) => {
  return (
    <div
      style={{
        display: "flex",
        border: "1px solid #000",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        boxShadow: "1px 2px 2px 2px grey",
        borderRadius: "16px",
      }}
      onClick={onClick}
    >
      <Image src={img} width={width} height={height} alt={title} />
      <p>{title}</p>
    </div>
  );
};

export default Card;
