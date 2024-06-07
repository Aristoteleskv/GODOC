import { Subscription } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

interface BreadcrumbItem {
  label: string;
  link: string;
  isLink: boolean;
  isTextDark: boolean;
}

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {

  @Input() breadcrumbs: BreadcrumbItem[] = []

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {

  }


  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params =>{
      this.activatedRoute
    });
  }
}
