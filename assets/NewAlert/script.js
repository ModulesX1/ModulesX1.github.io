/**
 * NewAlert v1.1.0 beta
 * Copyright 2023 Mr.Phiraphan
 * Licensed under MIT
 */
( function( ThisWindow, NewAlert ){
    if ( ThisWindow && ThisWindow['document'] ) NewAlert();
})( window || this, function() {

"use strict";

const util = {
    /**
     * 
     * @param { String } ElementName Element tag name
     * @param { Object } ElementOption Element attribute
     * @param { String } ElementOption.className Element attribute class name
     */
    createAlertNode( ElementName, ElementOption ) {
        const Element = document.createElement( ElementName );
        Object.keys( ElementOption ).forEach( key => Element[key] = ElementOption[key] );
        return Element
    },
    /**
     * 
     * @param { Object } ElementOption Create SVG
     * @param { {} } ElementOption.path Create SVG path
     */
    createAlertNodeNS( ElementOption ) {
        const ElementSVG = document.createElementNS( "http://www.w3.org/2000/svg", "svg" );
        Object.keys( ElementOption ).forEach( key => key !== "path" && ElementSVG.setAttribute( key, ElementOption[key] ) );
        const ElementPath = document.createElementNS( "http://www.w3.org/2000/svg", "path" );
        Object.keys( ElementOption.path ).forEach( key => ElementPath.setAttribute( key, ElementOption['path'][key] ) );
        if ( ElementOption.path ) ElementSVG.appendChild( ElementPath );
        return ElementSVG
    },
    icons: {
        info: {
            svg: {
                xmlns: "http://www.w3.org/2000/svg",
                width: "16",
                height: "16",
                fill: "#0dcaf0",
                viewBox: "0 0 16 16",
                path: {
                    d: "M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"
                }
            },
            color: "#0dcaf0"
        },
        error: {
            svg: {
                xmlns: "http://www.w3.org/2000/svg",
                width: "16",
                height: "16",
                fill: "#dc3545",
                viewBox: "0 0 16 16",
                path: {
                    d: "M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"
                }
            },
            color: "#dc3545"
        },
        success: {
            svg: {
                xmlns: "http://www.w3.org/2000/svg",
                width: "16",
                height: "16",
                fill: "#198754",
                viewBox: "0 0 16 16",
                path: {
                    d: "M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"
                }
            },
            color: "#198754"
        },
        warning: {
            svg: {
                xmlns: "http://www.w3.org/2000/svg",
                width: "16",
                height: "16",
                fill: "#ffc107",
                viewBox: "0 0 16 16",
                path: {
                    d: "M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"
                }
            },
            color: "#ffc107"
        },
        close: {
            xmlns: "http://www.w3.org/2000/svg",
            width: "16",
            height: "16",
            fill: "#000",
            viewBox: "0 0 16 16",
            path: {
                d: "M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"
            }
        }
    },
    /**
     * @param { AlertToast } Toast Alert toast item
     */
    removeToast( Toast, callback ) {
        Toast.classList.replace( "alert->show", "alert->hide" );
        setTimeout( function() {
            if ( !Toast.closed ) {
                Toast.remove();
                Toast.closed = true;
                typeof callback === "function" && !callback(true);
            }
        }, 400 )
    },
    InitStyle: '@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;500&display=swap");.alert-\>container{font-family:"Poppins",sans-serif;max-width:calc(100% - 2em);-webkit-user-select:none;-ms-user-select:none;z-index:2147483647;user-select:none;position:fixed;min-width:280px;right:1em;top:1em}.alert-\>toast{box-shadow:rgba(17,17,26,.1) 0px 0px 16px;background:#fff;margin-bottom:15px;border-radius:9px;position:relative;overflow:hidden}.alert-\>item{grid-template-columns:65px auto 35px;min-height:55px;display:grid}.alert-\>icon{border-left:6px solid var(--icon-color);border-bottom-left-radius:9px;border-top-left-radius:9px;justify-content:center;align-items:center;display:flex}.alert-\>icon svg{height:30px;width:30px}.alert-\>content{padding:10px 0;max-width:215px}.alert-\>content .alert-\>header{font-weight:500;font-size:14pt}.alert-\>content .alert-\>message{font-weight:300;font-size:11pt}.alert-\>button{justify-content:center;padding-top:10px;display:flex}.alert-\>button svg{cursor:pointer;padding:5px}.alert-\>progress{animation:ProgressBar var(--alert-timeout);background:var(--progress-color);position:absolute;height:2px;bottom:0;width:0;left:0}.alert-\>toast.alert-\>show{animation:ShowAlert .8s}.alert-\>toast.alert-\>hide{animation:HideAlert .8s}@keyframes ShowAlert{0%{transform:translate(40px,-20px);opacity:0}70%{transform:translateX(-1em) scale(1.1)}100%{transform:translateX(0);opacity:1}}@keyframes HideAlert{0%{transform:translateX(0);opacity:1}100%{transform:translateX(40px);opacity:0}}@keyframes ProgressBar{0%{width:100%}100%{width:0}}@-webkit-keyframes ShowAlert{0%{-webkit-transform:translate(40px,-20px);opacity:0}70%{-webkit-transform:translateX(-1em) scale(1.1)}100%{-webkit-transform:translateX(0);opacity:1}}@-webkit-keyframes HideAlert{0%{-webkit-transform:translateX(0);opacity:1}100%{-webkit-transform:translateX(40px);opacity:0}}@-webkit-keyframes ProgressBar{0%{width:100%}100%{width:0}}@-moz-keyframes ShowAlert{0%{-moz-transform:translate(40px,-20px);opacity:0}70%{-moz-transform:translateX(-1em) scale(1.1)}100%{-moz-transform:translateX(0);opacity:1}}@-moz-keyframes HideAlert{0%{-moz-transform:translateX(0);opacity:1}100%{-moz-transform:translateX(40px);opacity:0}}@-moz-keyframes ProgressBar{0%{width:100%}100%{width:0}}@-ms-keyframes ShowAlert{0%{-ms-transform:translate(40px,-20px);opacity:0}70%{-ms-transform:translateX(-1em) scale(1.1)}100%{-ms-transform:translateX(0);opacity:1}}@-ms-keyframes HideAlert{0%{-ms-transform:translateX(0);opacity:1}100%{-ms-transform:translateX(40px);opacity:0}}@-ms-keyframes ProgressBar{0%{width:100%}100%{width:0}}'
}

let initContainer = false;
const AlertContainer = util.createAlertNode( "div", {
    className: "alert->container"
});

const AlertStyle = util.createAlertNode( "style", {
    className: "alert->stylesheet"
});
AlertStyle.innerHTML = util.InitStyle;

/**
 * @param { Object } options
 * @param { Number } options.timeout Alert timeout
 * @param { "success" | "error" | "warning" | "info" } options.type Alert type ( default = info )
 * @param { String } options.header Alert header
 * @param { String } options.content Alert text content
 * @param { Function } options.success Callback function if alert closed
 */
function NewAlert( options ) {
    
    if ( !initContainer ) {
        initContainer = true;
        window.document.head.appendChild( AlertStyle );
        window.document.body.appendChild( AlertContainer );
    }
    
    const AlertToast = util.createAlertNode( "div", {
        className: "alert->toast alert->show"
    });

    const AlertItem = util.createAlertNode( "div", {
        className: "alert->item"
    });

    // grid left
    const AlertIcon = util.createAlertNode( "div", {
        className: "alert->icon"
    });
    AlertIcon.setAttribute( "style", `--icon-color:${util.icons[ options.type || "info" ]['color']}` );
    const SvgAlertIcon = util.createAlertNodeNS( util.icons[ options.type || "info" ]['svg'] );
    AlertIcon.appendChild( SvgAlertIcon );
    
    // grid center
    const AlertContent = util.createAlertNode( "div", {
        className: "alert->content"
    });
    const AlertHeader = util.createAlertNode( "div", {
        className: "alert->header",
        textContent: options.header
    });
    const AlertMessage = util.createAlertNode( "div", {
        className: "alert->message",
        textContent: options.content
    });
    AlertContent.appendChild( AlertHeader );
    AlertContent.appendChild( AlertMessage );

    // grid right
    const AlertButton = util.createAlertNode( "div", {
        className: "alert->button"
    });
    const SvgHideAlert = util.createAlertNodeNS( util.icons.close );
    AlertButton.appendChild( SvgHideAlert );
    AlertButton.onclick = () => util.removeToast( AlertToast, options.success );

    const AlertProgress = util.createAlertNode( "div", {
        className: "alert->progress"
    });
    AlertProgress.setAttribute( "style", `--progress-color:${util.icons[ options.type || "info" ]['color']};--alert-timeout:${ ( (typeof options.timeout === "number" ? options.timeout + 1000 : false ) || 4500 ) + "ms" }` );

    AlertItem.appendChild( AlertIcon );
    AlertItem.appendChild( AlertContent );
    AlertItem.appendChild( AlertButton );

    AlertToast.appendChild( AlertItem );
    AlertToast.appendChild( AlertProgress );

    AlertContainer.insertAdjacentElement( "afterbegin", AlertToast );
    setTimeout( function() {
        util.removeToast( AlertToast, options.success );
    }, options.timeout || 3500 )
}
    
const build = {
    clear() {
        AlertContainer.querySelectorAll(".alert-\\>toast").forEach( evt => {
            evt.closed = true;
        })
        AlertContainer.innerHTML = "";
    },
    version: "1.1.0"
}

window.alert.fire = NewAlert.bind();
window.alert.fire['clear'] = build.clear;
window.alert.fire['version'] = build.version;

});
