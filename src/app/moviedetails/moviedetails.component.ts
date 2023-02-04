import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from './../movies.service';

@Component({
  selector: 'app-moviedetails',
  templateUrl: './moviedetails.component.html',
  styleUrls: ['./moviedetails.component.css']
})
export class MoviedetailsComponent implements OnInit {
  item:any;
  mediaType:string="";
  similarMovies:any[]=[];
  constructor(private _MoviesService:MoviesService, private _ActivatedRoute:ActivatedRoute){
}
  ngOnInit(): void {
    let {id,media_type}=this._ActivatedRoute.snapshot.params; 
    this.mediaType=media_type
    this._MoviesService.getItemDetails(id,media_type).subscribe({
      next:(data)=>this.item=data
    })

    this._MoviesService.getSimilarMovies(id,media_type).subscribe({
      next:(data)=>this.similarMovies=data.results.filter((item: { poster_path: null; })=>item.poster_path!=null).slice(0,12)
    })
  }

  getSimilar(id:string,media_type:string){
    this._MoviesService.getItemDetails(id,media_type).subscribe({
      next:(data)=>this.item=data
    })
    
    this._MoviesService.getSimilarMovies(id,media_type).subscribe({
      next:(data)=>this.similarMovies=data.results.filter((item: { poster_path: null; })=>item.poster_path!=null).slice(0,12)
    })
  }
}
