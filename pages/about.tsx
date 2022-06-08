import Image from "next/image";
import React from "react";

function About() {
  return (
    <div className="flex w-full items-center justify-center p-10">
      <div className=" bg-white flex flex-col max-w-5xl items-center p-12 rounded-md ">
        <div className=" flex p-5">
          <h1 className=" text-2xl">
            Strona wykonana w ramach Warsztatów Praktyk Zawodowych
          </h1>
        </div>
        <h1 className="text-xl">Autorzy: </h1>
        <div className=" items-center space-y-2 flex-col mb-10">
          <p>Jakub Niedźwiedź</p>
          <p>Kamil Orłowski </p>
          <p>Marcin Rzepka</p>
          <p>Szymon Skowiński</p>
        </div>
        <Image
          width={350}
          height={109}
          src={
            "https://dl.wsei.lublin.pl/pluginfile.php/1/theme_adaptable/logo/1643203053/WSEI-logo_platforma.png"
          }
        />
      </div>
    </div>
  );
}

export default About;
