


from shiny import App, ui, render

app_ui = ui.page_fluid(
    ui.panel_title("Posit Connect RAG Agent (beta)"),
    ui.markdown(
        """
        ## AI-powered Posit Connect hub for government data analysts
        Your comprehensive resource for Posit Connect deployment, Python and R development, training materials, best practices, and "gold standard" applications. Upload your documentation for analysis, get instant answers about data science workflows, and access curated examples from across government departments.
        """
    ),
    ui.input_radio_buttons(
        "section",
        "Choose section:",
        {"chat": "Chat", "upload": "Upload", "search": "Search", "help": "Help"},
        selected="chat"
    ),
    ui.panel_conditional(
        "input.section == 'chat'",
        ui.h3("Chat"),
        ui.input_text("chat_input", "Ask a question:"),
        ui.input_action_button("send_chat", "Send"),
        ui.output_text_verbatim("chat_response", placeholder=True),
    ),
    ui.panel_conditional(
        "input.section == 'upload'",
        ui.h3("Upload Documents"),
        ui.input_file("upload_docs", "Upload documents", multiple=True),
        ui.output_text_verbatim("upload_status", placeholder=True),
    ),
    ui.panel_conditional(
        "input.section == 'search'",
        ui.h3("Search Documents"),
        ui.input_text("search_input", "Search documents:"),
        ui.input_action_button("search_btn", "Search"),
        ui.output_text_verbatim("search_results", placeholder=True),
    ),
    ui.panel_conditional(
        "input.section == 'help'",
        ui.h3("Help & Information"),
        ui.markdown(
            """
            - Ask questions about Posit Connect, Python, and R development.
            - Upload your own documents for analysis.
            - Search across uploaded and built-in knowledge.
            - For more, visit [docs.posit.co/connect](https://docs.posit.co/connect/)
            """
        ),
    ),
)

def server(input, output, session):
    @output()
    @render.text
    def chat_response():
        if input.send_chat():
            return f"[Placeholder] You asked: {input.chat_input()}"
        return ""

    @output()
    @render.text
    def upload_status():
        files = input.upload_docs()
        if files:
            return f"[Placeholder] Uploaded {len(files)} file(s)."
        return ""

    @output()
    @render.text
    def search_results():
        if input.search_btn():
            return f"[Placeholder] Search for: {input.search_input()}"
        return ""

app = App(app_ui, server)
