import { NgModule } from "@angular/core";
import { StudentsComponent } from "./components/students/students.component";
import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { StudentService } from "./services/student.service";
import { HttpClientModule } from "@angular/common/http";
import { LanguagePipe } from "./pipes/language-pipe";
import { DateFormatPipe } from "./pipes/date-format";
import { FormsModule } from "@angular/forms";

@NgModule({
	declarations: [
		StudentsComponent,
		AppComponent,
		LanguagePipe,
		DateFormatPipe
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		FormsModule

	],
	providers: [
		StudentService
	],
	bootstrap: [AppComponent]
})
export class AppModule{

}