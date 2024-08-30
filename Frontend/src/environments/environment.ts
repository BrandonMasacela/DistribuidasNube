export const environment = {
    production: false,
    authorize_uri: 'http://localhost:9000/oauth2/authorize?',
    client_id:'client',
    redirect_uri:'http://:4200/authorized',
    scope:'profile',
    response_type:'code',
    response_mode:'form_post',
    code_challenge_method:'S256',
    code_challenge:'QwAvx-10dseP_xmAqzQ2aw4sdl1uf307qygg-h6fC5E',
    code_verifier:'HRtaS8MPiYSboJfdyaMDGouMt5RAHgjIPWPfRjZSkvR',
    token_uri: 'http://localhost:9000/oauth2/token',
    resource_uri: 'http://localhost:8080/resource/'
};