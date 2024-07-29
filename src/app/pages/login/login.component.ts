  // import { Component, inject } from '@angular/core';
  // import { FormsModule } from '@angular/forms';
  // import { MasterService } from '../service/master.service';
  // import { Router } from '@angular/router';

  // @Component({
  //   selector: 'app-login',
  //   standalone: true,
  //   imports: [FormsModule],
  //   templateUrl: './login.component.html',
  //   styleUrl: './login.component.css'
  // })
  // export class LoginComponent {
  //     loginObj = {
  //         "email": "",
  //       "password": ""
  //     }

  //     masterSrv = inject(MasterService)

  //     router = inject(Router)


  //     onLogin(){
  //       // debugger;
  //       this.masterSrv.login(this.loginObj).subscribe((res:any)=>{
  //         // debugger;
  //         if(res.statusCode == 200 || res.statusCode == 201){
              // localStorage.setItem("", JSON.stringify(res.data))
  //             this.router.navigateByUrl('dashboard')
  //         }else{
  //           console.log(res.error)
  //           console.log(res.error)
  //           // alert(res.error.message)

  //         }
  //       })

  //     }
  // }
  import { Component, inject } from '@angular/core';
  import { FormsModule } from '@angular/forms';
  import { MasterService } from '../service/master.service';
  import { Router } from '@angular/router';
  import { HttpErrorResponse } from '@angular/common/http'; // Import HttpErrorResponse

  @Component({
    selector: 'app-login',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'] // Fixed typo from styleUrl to styleUrls
  })
  export class LoginComponent {
      loginObj = {
          "email": "",
          "password": ""
      };

      masterSrv = inject(MasterService);
      router = inject(Router);

      onLogin() {
          this.masterSrv.login(this.loginObj).subscribe({
              next: (res: any) => {
                  if (res.statusCode === 200 || res.statusCode === 201) {
                    if (res.jwtTokens) {
                      localStorage.setItem('jwtToken', res.jwtTokens);
                    }

                    // Optionally store the role token or other data
                    if (res.roleToken) {
                      localStorage.setItem('roleToken', res.roleToken);
                    }

                      // Navigate to dashboard on successful login
                      this.router.navigateByUrl('dashboard');
                  } else {
                      // Handle non-successful response
                      console.error('Error response:', res);
                      alert('An error occurred: ' + (res.error.message?.join(', ') || 'Unknown error'));
                  }
              },
              error: (err: HttpErrorResponse) => {
                  // Handle HTTP error response
                  console.error('HTTP error:', err);
                  const errorMessage = err.error?.message?.join(', ') || 'Unknown error occurred';
                  alert('Login failed: ' + errorMessage);
              }
          });
      }
  }
