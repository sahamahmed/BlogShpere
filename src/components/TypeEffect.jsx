import { useTypewriter, Cursor } from "react-simple-typewriter";

export const TypeEffect = () => {
     const [text] = useTypewriter({
       words: ["Explore.", "Discover.", "Inspire."],
       loop: true,
       typeSpeed: 30,
       deleteSpeed: 10,
       delaySpeed: 1500,
     });
  return (
    <p className="text-3xl md:text-4xl text-white font-bold text-center mt-8 lg:text-5xl">
      {text}
      <Cursor cursorBlinking cursorStyle="|" cursorColor="#ffffff"></Cursor>
    </p>
  );
}
