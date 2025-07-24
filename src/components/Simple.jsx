import { useRive } from "@rive-app/react-canvas";

const Simple = () => {
  const { RiveComponent } = useRive({
    src: "/animations/cup_of_coffee.riv",
    autoplay: true,
  });

  return (
    <div style={{ width: 400, height: 400 }} className="absolute -bottom-[5.3rem] left-[4rem]">
      <RiveComponent  />
    </div>
  );
};

export default Simple;
