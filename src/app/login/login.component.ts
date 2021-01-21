import { Component, OnInit } from "@angular/core";
import { LoginService } from "./login.service";
import { MyApiService } from "../my-api.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  public login: string;
  public pwd: string;
  public msgError: string;
  submitted = false;

  constructor(
    private myApiService: MyApiService,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit() {}

  goToHome() {
    this.router.navigate(["/"]);
  }

  submit() {
    this.loginService.signIn(this.login, this.pwd).subscribe((res) => {
      if (res.status === "success") {
        const token = res.token;
        this.myApiService.storeUserCredentials(token);
        this.router.navigate(["david"]);
      } else {
        this.msgError = res.message;
        this.submitted = true;
      }
    });
  }
}
