setFontsize=()=>{
    var fontsize=document.getElementById('fontsize').value;
    var editor=document.getElementById('editor').style;
    console.log(fontsize);
    editor.fontSize=fontsize;
}
setBackground=(value)=>{
    set=(color)=>{
        var html=document.getElementsByTagName('html')[0];
        var body=document.getElementsByTagName('body')[0];
        var select=document.getElementsByTagName('select');
        body.style.backgroundColor=color;
        select[0].style.backgroundColor=color;
        select[1].style.backgroundColor=color;
        html.style.backgroundColor=color;
    }
    if(value=='clouds') set("darkslateblue");
    if(value=='monokai') set("teal");
    if(value=='terminal') set("whitesmoke");
    if(value=='dracula') set("deeppink");
}
setTheme=()=>{
    var theme=document.getElementById('theme').value;
    setBackground(theme);
    theme="ace/theme/"+theme;
    var editor = ace.edit("editor");
    editor.setTheme(theme);
}
updateEditor=(content)=>{
    let mount=document.getElementById('channel').contentDocument;
    mount.open();
    mount.write(content);
    mount.close();
}
handleEditor=()=>{
    let editor=ace.edit('editor');
    editor.getSession();
    content=editor.getValue()
    updateEditor(content);
}
setEditor=(Response)=>{
    let editor = ace.edit("editor");
    editor.setTheme("ace/theme/monokai");
    editor.setAutoScrollEditorIntoView(true);
    editor.session.setMode("ace/mode/html");
    editor.setValue(Response);        
    updateEditor(Response);
    editor.getSession().on('change',function(){
            handleEditor();
    })
}
filterCall=()=>{
    let loader=new URL(window.location.href);
    let fileLocation=loader.searchParams.get('no');
    return "../files/"+fileLocation+".html";
}
window.onload=function(){
    let xmlhttp = new XMLHttpRequest(),
    method = 'GET',
    URL = filterCall();
    xmlhttp.open(method, URL, false);
    xmlhttp.onload = function () {
        setEditor(xmlhttp.response);
    };    
    xmlhttp.send();
}
document.getElementById('editor').style.fontSize='12px';
