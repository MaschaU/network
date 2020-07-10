import React from "react";
import Profilepic from "./profilepic";
import {render} from "@testing-library/react";
import { test } from "jest";

// TestScheduler("Renders img with src set to url prop", ()

test("renders img with src set to default.jpg when no url is present",()=>{
    const {container} = render(<Profilepic />);
    expect(container.querySelector("img").getAttribute("src")
    ).toBe("/default.jpg");
});
