/*-------------------------------------*/
// User related key variable will be stored here.
// This is session file for the user that hold the
// information related to users saved into 
// localstorage
/*-----------------------------------------*/

export var userInfo:any = (window.localStorage.getItem('userAuthData')) ? JSON.parse(window.localStorage.getItem('userAuthData')) : "";
export var authToken:any = (window.localStorage.getItem('logintoken')) ? window.localStorage.getItem('logintoken'): "";

