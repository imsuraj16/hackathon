import { useRive } from "@rive-app/react-canvas";

const Simple = () => {
  const { RiveComponent } = useRive({
    src: "/animations/cup_of_coffee.riv",
    autoplay: true,
  });

  return (
    <div style={{ width: 450, height: 450 }} className="absolute -bottom-[5rem]">
      <RiveComponent  />
    </div>
  );
};

export default Simple;
