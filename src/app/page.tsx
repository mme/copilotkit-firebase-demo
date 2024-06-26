"use client";
import {
  CopilotKit,
  useCopilotAction,
  useMakeCopilotReadable,
} from "@copilotkit/react-core";
import { CopilotTextarea } from "@copilotkit/react-textarea";
import { CopilotSidebar } from "@copilotkit/react-ui";
import "@copilotkit/react-ui/styles.css";
import { useState } from "react";
import "@copilotkit/react-textarea/styles.css";
import "@copilotkit/react-ui/styles.css";
function InsideHome() {
  const [message, setMessage] = useState("Hello World!");
  const [text, setText] = useState("");
  useMakeCopilotReadable(
    "This is the current message: " + JSON.stringify(message)
  );
  useCopilotAction(
    {
      name: "displayMessage",
      description: "Display a message.",
      parameters: [
        {
          name: "message",
          type: "string",
          description: "The message to display.",
          required: true,
        },
      ],
      handler: async ({ message }) => {
        setMessage(message);
      },
      render: (props) => {
        return (
          <div style={{ backgroundColor: "black", color: "white" }}>
            <div>Status: {props.status}</div>
            <div>Message: {props.args.message}</div>
          </div>
        );
      },
    },
    []
  );
  return (
    <>
      <div>{message}</div>
      <CopilotTextarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        autosuggestionsConfig={{
          textareaPurpose: "an outline of a presentation about elephants",
          chatApiConfigs: {},
        }}
      />
    </>
  );
}
export default function Home() {
  return (
    <CopilotKit url="http://127.0.0.1:5001/copilotkit-test-12345/us-central1/copilotKit">
      <CopilotSidebar
        defaultOpen={true}
        labels={{
          title: "Presentation Copilot",
          initial: "Hi you! 👋 I can give you a presentation on any topic.",
        }}
      >
        <InsideHome />
      </CopilotSidebar>
    </CopilotKit>
  );
}
