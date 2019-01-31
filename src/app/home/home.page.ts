import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  sm1 = [
    {icon: 'book', name: 'Applied Physics for Enginners', tname: 'Sir Zaheer Gondal'},
    {icon: 'book', name: 'Introduction to ICT', tname: 'Sir Zaheer Gondal'},
    {icon: 'book', name: 'Calculus and Analytic Geometry', tname: 'Sir Zaheer Gondal'},
    {icon: 'book', name: 'English Comprehension and Composition', tname: 'Sir Zaheer Gondal'},
    {icon: 'book', name: 'Islamic Studies', tname: 'Sir Zaheer Gondal'},
  ]

  sm2 = [
    {icon: 'book', name: 'Electricity, Magnetism & Optics', tname: 'Sir Zaheer Gondal'},
    {icon: 'book', name: 'Programming Fundamentals', tname: 'Sir Zaheer Gondal'},
    {icon: 'book', name: 'Multivaribale Calculus', tname: 'Sir Zaheer Gondal'},
    {icon: 'book', name: 'Discrete Structure', tname: 'Sir Zaheer Gondal'},
    {icon: 'book', name: 'Professional Pratices for IT', tname: 'Sir Zaheer Gondal'},
  ]

}
