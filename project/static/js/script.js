document.addEventListener('DOMContentLoaded', () => {

    const connector_buttons = document.querySelectorAll('.button-icon');
    const timer = document.querySelector('header .timer-button');
    const startSound = document.getElementById('start-timer-sound');
    const fanSound = document.getElementById('start-fan-sound');
    const motorSound = document.getElementById('start-motor-sound');
    const fan = document.querySelector('.rotate-3d .ceiling-container');
    const fan_indicator = document.querySelector('.connect-shape');
    const imageShapes = document.querySelectorAll('img[data-connect-color]');
    const app_vars = document.querySelectorAll(
        'span[data-type-var], span.value-data-timer, .variable-generale .card-value'
    );
    const tempuratureBars = document.querySelectorAll(
        '.palliers-et-cylinders .temperature-bars .bar'
    );
    const cyclindersBars = document.querySelector('.cyclinders-rectangle-bars');
    const cylindersAmpoules = document.querySelectorAll(
        '.cylinder-item .progress-value'
    );

    // EMPTY LINKS
    const emptyLinks = document.querySelectorAll('a[href="#"]');
    emptyLinks.forEach((link) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
        });
    });

    // CONNECT CONTROLLERS PROCESS FUNCTION
    const checkConnecter = (connector) => {
        // SWITCH ON/OFF
        connector.classList.toggle('connected');
        const colorType = connector.getAttribute('data-color');

        if (connector.classList.contains('connected')) {
            // SWITCH TO CONNECTED ICONS
            if (connector.getAttribute('data-type') === 'connector-1') {
                // UPDATE SRC IMAGE
                connector.firstElementChild.setAttribute(
                    'src',
                    staticImageUrl + 'connected-connector-' + colorType + '.svg'
                );
            } else if (connector.getAttribute('data-type') === 'connector-2') {
                // UPDATE SRC IMAGE
                connector.firstElementChild.setAttribute(
                    'src',
                    staticImageUrl+'connected-shape-9-'+colorType+'.svg'
                );
            } else if (connector.getAttribute('data-type') === 'connector-3') {
                // UPDATE SRC IMAGE
                connector.firstElementChild.setAttribute(
                    'src',
                    staticImageUrl+'connected-shape-25-'+colorType+'.svg'
                );
            } else if (connector.getAttribute('data-type') === 'connector-4') {
                // UPDATE SRC IMAGE
                connector.firstElementChild.setAttribute(
                    'src',
                    staticImageUrl+'connected-shape-32-'+colorType+'.png'
                );
            } else if (connector.getAttribute('data-type') === 'connector-5') {
                // UPDATE SRC IMAGE
                connector.firstElementChild.setAttribute(
                    'src',
                    staticImageUrl+'connected-shape-42-'+colorType+'.svg'
                );
            }
        } else {
            // SWITCH BACK TO UNCONNECTED ICONS
            if (connector.getAttribute('data-type') === 'connector-1') {
                // UPDATE SRC IMAGE
                connector.firstElementChild.setAttribute(
                    'src',
                    staticImageUrl+'unconnected-connector.svg'
                );
            } else if (connector.getAttribute('data-type') === 'connector-2') {
                // UPDATE SRC IMAGE
                connector.firstElementChild.setAttribute(
                    'src',
                    staticImageUrl+'shape-9.png'
                );
            } else if (connector.getAttribute('data-type') === 'connector-3') {
                // UPDATE SRC IMAGE
                connector.firstElementChild.setAttribute(
                    'src',
                    staticImageUrl+'shape-25.svg'
                );
            } else if (connector.getAttribute('data-type') === 'connector-4') {
                // UPDATE SRC IMAGE
                connector.firstElementChild.setAttribute(
                    'src',
                    staticImageUrl+'shape-32.png'
                );
            } else if (connector.getAttribute('data-type') === 'connector-5') {
                // UPDATE SRC IMAGE
                connector.firstElementChild.setAttribute(
                    'src',
                    staticImageUrl+'shape-42.svg'
                );
            }
        }
    };

    connector_buttons.forEach((button) => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            checkConnecter(button);
        });
    });

    let timerInterval;
    let hours = 0;
    let minutes = 0;
    let seconds = 0;

    // DISPLAY TIMER FUNCTION
    const displayTimer = () => {
        seconds++;

        if (seconds == 60) {
            seconds = 0;
            minutes++;
        }

        if (minutes == 60) {
            minutes = 0;
            hours++;
        }

        const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;
        const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
        const formattedHours = hours < 10 ? '0' + hours : hours;

        document.querySelector('.timer-button .timer-output').innerHTML =
            formattedHours + ':' + formattedMinutes + ':' + formattedSeconds;
    };

    // START / STOP PROCESS FUNCTION
    const check_runtime = () => {
        if (timer.classList.contains('start')) {
            timer.firstElementChild.textContent = 'STOP';
            startSound.play();

            timerInterval = setInterval(displayTimer, 1000);

            if (fan != null) {
                // PLAY FAN
                fan.classList.add('spin');
                fan_indicator.classList.add('connected');
                fanSound.play();
            }

            if (motorSound != null) {
                motorSound.play();
            }

            if (imageShapes != null) {
                imageShapes.forEach((shape) => {
                    shape.setAttribute(
                        'src',
                        staticImageUrl + shape.getAttribute('data-image') + '-' + shape.getAttribute('data-connect-color') + '.svg'
                    );
                });
            }

            if (cyclindersBars != null) {
                const bars = document.querySelectorAll(
                    '.cyclinders-rectangle-bars .bar'
                );

                bars.forEach((bar) => {
                    if (bar.classList.contains('col-1')) {
                        bar.firstElementChild.children[0].classList.add(
                            'animate-1'
                        );
                        bar.firstElementChild.children[0].style.animationPlayState =
                            'running';
                    }
                    if (bar.classList.contains('col-2')) {
                        bar.firstElementChild.children[0].classList.add(
                            'animate-2'
                        );
                        bar.firstElementChild.children[0].style.animationPlayState =
                            'running';
                    }
                    if (bar.classList.contains('col-3')) {
                        bar.firstElementChild.children[0].classList.add(
                            'animate-3'
                        );
                        bar.firstElementChild.children[0].style.animationPlayState =
                            'running';
                    }
                });
            }

            if (tempuratureBars != null) {
                // SET STATIC VALUE FOR EACH BAR
                tempuratureBars.forEach((bar) => {
                    bar.setAttribute('data-charge', 50);
                });
            }

            if (cylindersAmpoules != null) {
                // SET STATIC VALUE FOR EACH AMPOULE
                cylindersAmpoules.forEach((amp) => {
                    amp.setAttribute(
                        'data-value',
                        amp.getAttribute('data-charge')
                    );
                });
            }

            // SHOW VALUES
            app_vars.forEach((var_item) => {
                var_item.textContent = var_item.getAttribute('data-value');
            });

            // AUTO CONNECT CONTROLLERS BUTTONS & ICONS

            if (connector_buttons != null) {
                const filteredConnectors = Array.from(connector_buttons).filter(
                    (element) =>
                        !element.classList.contains('not-auto-connected')
                );

                filteredConnectors.forEach((button) => {
                    if (!button.classList.contains('connected')) {
                        checkConnecter(button);
                    }
                });
            }
        } else {
            // REST TIMER
            timer.firstElementChild.textContent = 'START';
            hours = 0;
            minutes = 0;
            seconds = 0;
            clearInterval(timerInterval);
            timer.lastElementChild.textContent = '00:00:00';

            if (fan != null) {
                // STOP FAN
                fan.classList.remove('spin');
                fan_indicator.classList.remove('connected');
                fanSound.pause();
            }

            if (motorSound != null) {
                motorSound.pause();
            }

            if (imageShapes != null) {
                imageShapes.forEach((shape) => {
                    shape.setAttribute(
                        'src',
                        staticImageUrl + shape.getAttribute('data-image')+ '.svg'
                    );
                });
            }

            if (cyclindersBars != null) {
                const bars = document.querySelectorAll(
                    '.cyclinders-rectangle-bars .bar'
                );

                bars.forEach((bar) => {
                    bar.firstElementChild.children[0].style.animationPlayState =
                        'paused';
                });
            }

            // RESET TEMPERATEUR BARS

            if (tempuratureBars != null) {
                // SET STATIC VALUE FOR EACH BAR
                tempuratureBars.forEach((bar) => {
                    bar.setAttribute('data-charge', 0);
                });
            }

            // REST AMPOULES VALUES
            if (cylindersAmpoules != null) {
                // SET STATIC VALUE FOR EACH AMPOULE
                cylindersAmpoules.forEach((amp) => {
                    amp.setAttribute('data-value', 0);
                });
            }

            // RESET VARIABLES VALUES
            app_vars.forEach((var_item) => {
                app_vars.forEach((var_item) => {
                    if (var_item.hasAttribute('data-default-value')) {
                        var_item.textContent =
                            var_item.getAttribute('data-default-value');
                    } else {
                        var_item.textContent = '0.00';
                    }
                });
            });

            //  RESET CONNECTORS BACK
            if (connector_buttons != null) {
                connector_buttons.forEach((button) => {
                    if (button.classList.contains('connected')) {
                        checkConnecter(button);
                    }
                });
            }
        }
    };

    if (timer != null) {
        timer.addEventListener('click', () => {
            timer.classList.toggle('start');
            check_runtime();
        });
    }

    // MODAL
    const modalTriggers = document.querySelectorAll('.modal-trigger');

    if (modalTriggers != null) {
        modalTriggers.forEach((buttonTrigger) => {
            buttonTrigger.addEventListener('click', (e) => {
                e.preventDefault();

                const selectedModal = document.getElementById(
                    buttonTrigger.getAttribute('data-trigger')
                );

                selectedModal.classList.remove('is-hidden');
                selectedModal.classList.add('active');
            });
        });

        const closeModals = document.querySelectorAll('.close-modal');

        closeModals.forEach((closeBtn) => {
            closeBtn.addEventListener('click', () => {

                closeBtn.parentElement.parentElement.parentElement.classList.add(
                    'is-hidden'
                );

                closeBtn.parentElement.parentElement.parentElement.classList.remove(
                    'active'
                );
            });
        });
    }

    // SWITCH FIRE ICON COLOR
    document.querySelectorAll('.fire-list .circle').forEach((circle) => {
        const fireIcon = document.querySelector('.alarm-icon .las.la-fire');
        circle.addEventListener('click', (e) => {
            e.preventDefault();

            if (circle.classList.contains('blue')) {
                fireIcon.style.color = 'blue';
            }
            if (circle.classList.contains('white')) {
                fireIcon.style.color = 'white';
            }
            if (circle.classList.contains('black')) {
                fireIcon.style.color = 'black';
            }
        });
    });

    // URGENCE BUTTON STOP & RESET ALL PROCESS
    const urgenceButton = document.querySelector(
        'header .primary-button.danger-text'
    );

    urgenceButton.addEventListener('click', (e) => {
        e.preventDefault();

        if (timer.classList.contains('start')) {
            timer.classList.remove('start');
            check_runtime();
        }

        return;
    });
});
