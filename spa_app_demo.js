const appState = {
    current_view : 'intro',
    current_hire : 0,
    current_fire : 0
}

document.addEventListener('DOMContentLoaded',() => {
    create_user_view(1)

    //event delegation
    document.querySelector("#app_widget").onclick = (e) => {
        handle_vote(e)
    }
});

const handle_vote = (e) => {
    if (e.target.dataset.vote == "hire") {
        appState.current_hire += 1
        create_user_view(1)

    } else if (e.target.dataset.vote == "fire") {
        appState.current_fire += 1
        create_user_view(1)
    }

    if ((appState.current_hire - appState.current_fire) < 0 ) {
        alert("Restart")
        appState.current_hire = 0;
        appState.current_fire = 0;
    }
}

const create_user_view = async (user_idx) => {

    const data = await fetch("https://randomuser.me/api/?results=1")
    const model = await data.json()
    const html_element = render_widget(model,'#user_view')
    document.querySelector("#app_widget").innerHTMML = html_element;
}

const render_widget = (model, view) => {

    template_source = document.querySelector(view).innerHTML

    var template = Handlebars.compile(template_source);

    var html_widget_element = template({...model,...appState})

    return html_widget_element

}
