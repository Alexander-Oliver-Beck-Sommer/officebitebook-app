"use client";
import React, { useState } from "react";
import Accordion from "@/components/Accordion";
import ContentModal from "@/components/Modals/ContentModal";
import CheckboxThree from "@/components/CheckboxThree";
import ErrorModal from "@/components/Modals/ErrorModal";

const page = () => {
  // const [modalVisibility, setModalVisibility] = useState(false);
  // const handleModal = () => {
  //   setModalVisibility(!modalVisibility);
  // };
  return (
    <section className="fill-body pattern">
      <h4>Hello, World!</h4>
      {/* <button onClick={handleModal}>Open accordion</button>
      <ContentModal
        visibility={modalVisibility}
        toggle={handleModal}
        title="Hello, World!"
        size="max-w-screen-xl"
      >
        <p>Hej!</p>
      </ContentModal> */}
      <CheckboxThree />
      <ErrorModal />
    </section>
  );
};

export default page;
