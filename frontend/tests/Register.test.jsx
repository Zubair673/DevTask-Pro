import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom/vitest";

import Register from "../src/pages/Register/Register";

describe("Register Page Tests", () => {
  test("should render register page correctly", () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    expect(screen.getByText("DevTask")).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText(/name/i)
    ).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText(/email/i)
    ).toBeInTheDocument();

    expect(
      screen.getAllByPlaceholderText(/password/i)
    ).toHaveLength(2);

    expect(
      screen.getByRole("button", { name: /register/i })
    ).toBeInTheDocument();
  });
});