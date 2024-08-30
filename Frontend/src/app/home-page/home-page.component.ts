import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { HttpParams } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import e from 'express';
import { env } from 'process';

@Component({
  selector: 'app-home-page',
  standalone: true,
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  imports: [RouterModule, MatButtonModule, MatDividerModule, MatIconModule, CommonModule]
})
export default class HomePageComponent implements OnInit { 

  authorize_uri = 'http://tuURL:9000/oauth2/authorize?'; 
  params: any = {
    client_id:'client',
    redirect_uri:'http://tuURL:4200/authorized',
    scope:'profile',
    response_type:'code',
    response_mode:'form_post',
    code_challenge_method:'S256',
    code_challenge:'QwAvx-10dseP_xmAqzQ2aw4sdl1uf307qygg-h6fC5E'
  }

  isButtonVisible = true;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    //window.location.href = 'http://localhost:9000/login';
    this.onLogin();
  }
  
  onLogin(): void {
    const httpParams = new HttpParams({fromObject: this.params});
    const codeUrl = this.authorize_uri + httpParams.toString();
    location.href = codeUrl;
    console.log('Login button clicked');
    this.isButtonVisible = false
  }
}
