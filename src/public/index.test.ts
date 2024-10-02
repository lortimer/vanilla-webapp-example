import * as fs from "node:fs";
import path from "path";
import { beforeEach, describe, it, expect } from "vitest";
import { JSDOM } from "jsdom";
import { within } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

const html = fs.readFileSync(path.resolve(__dirname, "index.html"));

describe("index", () => {
    let dom: JSDOM;
    let container: HTMLElement;

    beforeEach(async () => {
        await new Promise<void>(resolve => {
            dom = new JSDOM(html, {
                runScripts: "dangerously",
                resources: "usable",
                url: `file://${__dirname}/index.html`
            });
            dom.window.document.addEventListener("DOMContentLoaded", () => {
                container = dom.window.document.body;
                resolve();
            });
        });
    });

    it("renders a heading", () => {
        const heading = within(container).getByRole("heading", { level: 1, name: "Static Website Test" });
        expect(heading).toBeVisible();
    });

    it("shows more text when button is clicked", async () => {
        const user = userEvent.setup();
        const button = within(container).getByRole("button", { name: "Add a Paragraph" });
        await user.click(button);
        expect(within(container).getByText("Paragraph #1 added by javascript")).toBeVisible();

        await user.click(button);
        expect(within(container).getByText("Paragraph #2 added by javascript")).toBeVisible();

        await user.click(button);
        expect(within(container).getByText("Paragraph #3 added by javascript")).toBeVisible();
    });
});
