import { render } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { jest } from "@jest/globals";

const tMock = jest.fn((key: string) => `traduzido:${key}`);

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: tMock,
  }),
}));

jest.mock("@/appRouter", () => ({
  appRouter: [
    {
      path: "/home",
      breadcrumb: { name: "home.title" },
    },
    {
      path: "/sobre",
      breadcrumb: { name: "about.title" },
    },
  ],
}));


import { useRouteResolver } from "@/hooks/useRouteResolver";

function TestComponent() {
  useRouteResolver();
  return null;
}

describe("useRouteResolver", () => {
  beforeEach(() => {
    document.title = "";
    tMock.mockClear();
  });

  it("deve definir o título traduzido corretamente quando a rota é conhecida", () => {
    render(
      <MemoryRouter initialEntries={["/home"]}>
        <Routes>
          <Route path="/home" element={<TestComponent />} />
        </Routes>
      </MemoryRouter>
    );

    expect(document.title).toBe("booknfix | traduzido:home.title");
    expect(tMock).toHaveBeenCalledWith("home.title");
  });

  it("deve definir o título padrão quando a rota não existe no appRouter", () => {
    render(
      <MemoryRouter initialEntries={["/rota-nao-existe"]}>
        <Routes>
          <Route path="*" element={<TestComponent />} />
        </Routes>
      </MemoryRouter>
    );

    expect(document.title).toBe("booknfix");
    expect(tMock).not.toHaveBeenCalled();
  });

  it("deve definir o título traduzido corretamente para outra rota válida", () => {
    render(
      <MemoryRouter initialEntries={["/sobre"]}>
        <Routes>
          <Route path="/sobre" element={<TestComponent />} />
        </Routes>
      </MemoryRouter>
    );

    expect(document.title).toBe("booknfix | traduzido:about.title");
    expect(tMock).toHaveBeenCalledWith("about.title");
  });
});
