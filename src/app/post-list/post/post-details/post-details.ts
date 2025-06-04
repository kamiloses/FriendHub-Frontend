import {Component, OnInit} from '@angular/core';
import {PostDetailsService} from './post-details.service';
import {PostModel} from '../../../models/post.model';

@Component({
  imports: [],
  standalone: true,
  selector: 'app-post-details',
  templateUrl: './post-details.html',
  styleUrls: ['./post-details.css'],
})
export class PostDetailsComponent implements OnInit{
  constructor(private postDetailsService:PostDetailsService) {
  }

  public postModel: Partial<PostModel> = {}; //todo nauczyc sie partial




  ngOnInit(): void {
        this.postDetailsService.getSpecificPost("683f0ad2ce5a4c4a70c07f53").subscribe({
          next:(post:PostModel)=>{
            this.postModel=post;},
          error:(error)=>{
            console.log(error)

    }


        })

    }


}
