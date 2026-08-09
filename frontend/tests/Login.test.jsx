import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import "@testing-library/jest-dom/vitest";

import Login from "../src/pages/Login/Login";

vi.mock("react-toastify", () => ({
  toast: {
    error: vi.fn(),
    success: vi.fn(),
  },
}));

vi.mock("../src/api/api", () => ({
  default: {
    post: vi.fn(),
  },
}));

describe("Login Page Tests", () => {

  // TEST 1
  test("should render login page correctly", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    expect(screen.getByText("DevTask")).toBeInTheDocument();
    expect(screen.getByText("Welcome Back")).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText("Enter your email")
    ).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText("Enter your password")
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: "Login" })
    ).toBeInTheDocument();
  });


  // TEST 2
  test("should show error when login fields are empty", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const loginButton = screen.getByRole("button", {
      name: "Login",
    });

    fireEvent.click(loginButton);

    expect(
      screen.getByText("Login")
    ).toBeInTheDocument();
  });


  // TEST 3
  test("should show password when Show Password is checked", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const passwordInput = screen.getByPlaceholderText(
      "Enter your password"
    );

    expect(passwordInput).toHaveAttribute(
      "type",
      "password"
    );

    const showPasswordCheckbox = screen.getByRole(
      "checkbox",
      { name: "Show Password" }
    );

    fireEvent.click(showPasswordCheckbox);

    expect(passwordInput).toHaveAttribute(
      "type",
      "text"
    );
  });

  // TEST 4
test("should toggle Remember Me checkbox", () => {
  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );

  const rememberMeCheckbox = screen.getByRole("checkbox", {
    name: "Remember Me",
  });

  expect(rememberMeCheckbox).not.toBeChecked();

  fireEvent.click(rememberMeCheckbox);

  expect(rememberMeCheckbox).toBeChecked();

  fireEvent.click(rememberMeCheckbox);

  expect(rememberMeCheckbox).not.toBeChecked();
});


// TEST 5
test("should display Forgot Password link", () => {
  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );

  const forgotPasswordLink = screen.getByRole("link", {
    name: "Forgot Password?",
  });

  expect(forgotPasswordLink).toBeInTheDocument();

  expect(forgotPasswordLink).toHaveAttribute(
    "href",
    "/forgot-password"
  );
});

});