window.onload = () => {

    // listen to burger menu click
    document.querySelector('.navbar-burger.burger').addEventListener('click', ({ target: { classList }}) => {
        classList.toggle('is-active')
        document.getElementById('navbaritems').classList.toggle('is-active');
    })
}