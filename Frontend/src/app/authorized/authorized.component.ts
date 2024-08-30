import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResourceService } from '../services/resource.service';
import { TokenService } from '../services/token.service';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-authorized',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  templateUrl: './authorized.component.html',
  styleUrl: './authorized.component.css'
})
export class AuthorizedComponent implements OnInit {

  code = '';
  isVerifying: boolean = true;
  credentialsValid: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tokenService: TokenService,
    private resourceService: ResourceService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const code = params['code'];
      if (code) {
        this.tokenService.exchangeCodeForToken(code).subscribe(
          (response) => {
            this.tokenService.setTokens(response.access_token, response.refresh_token);
            this.resourceService.getRoles().subscribe(
              (rolesResponse) => {
                const roles = rolesResponse.roles;
                console.log('Roles:', roles);

                setTimeout(() => {
                  this.isVerifying = false;
                  this.credentialsValid = roles.length > 0;
                  // Determinar el mensaje según el rol
                  if (this.credentialsValid) {
                    let message$ = this.resourceService.user(); // Mensaje predeterminado
                    
                    if (roles.includes('ROLE_ADMIN')) {
                      message$ = this.resourceService.admin();
                    }

                    message$.subscribe(
                      (messageResponse) => {
                        localStorage.setItem('userRoles', JSON.stringify(roles));
                        localStorage.setItem('welcomeMessage', messageResponse.message);

                        // Redirigir al usuario según su rol
                        if (roles.includes('ROLE_ADMIN')) {
                          this.router.navigate(['/homeAdmin']);
                        } else if (roles.includes('ROLE_USER')) {
                          this.router.navigate(['/homeUser']);
                        } else if (roles.includes('OIDC_USER')) {
                          this.router.navigate(['/homeUser']);
                        } else if (roles.includes('SCOPE_openid')) {
                          this.router.navigate(['/homeUser']);
                        } else if (roles.includes('SCOPE_https://www.googleapis.com/auth/userinfo.profile')) {
                          this.router.navigate(['/homeUser']);
                        } else if (roles.includes('SCOPE_https://www.googleapis.com/auth/userinfo.email')) {
                          this.router.navigate(['/homeUser']);
                        }
                      },
                      (error) => {
                        console.error('Error fetching message', error);
                        this.credentialsValid = false; // En caso de error, marcar credenciales como no válidas
                      }
                    );
                  } else {
                    this.credentialsValid = false; // No tiene roles válidos
                  }
                }, 3000);

              },
              (error) => {
                console.error('Error fetching roles', error);
                this.isVerifying = false;
                this.credentialsValid = false;
              }
            );
          },
          (error) => {
            console.error('Error exchanging code for token', error);
            this.isVerifying = false;
            this.credentialsValid = false;
          }
        );
      }
    });
  }
}
