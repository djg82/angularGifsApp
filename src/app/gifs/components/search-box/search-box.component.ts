import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  template: `
    <h5>Search:</h5>
    <!-- <input
      type="text"
      class="form-control"
      placeholder="Search Gifs..."
      (keyup.enter)="searchTag(txtTagInput.value)"
      #txtTagInput
    /> -->
    <input
      type="text"
      class="form-control"
      placeholder="Search Gifs..."
      (keyup.enter)="searchTag()"
      #txtTagInput
    />
  `,
})
// uso uno de los dos, con el @viewChild o pasando el parametro en la funcion
export class SearchBoxComponent {
  @ViewChild('txtTagInput')
  public tagInput!: ElementRef<HTMLInputElement>;
  constructor(private gifsService: GifsService) {}
  // searchTag(newTag: string) {
  //   const tag = this.tagInput.nativeElement.value;
  //   console.log({ newTag, tag });
  // }
  searchTag() {
    const tag = this.tagInput.nativeElement.value;
    // console.log({ tag });
    this.gifsService.searchTag(tag);
    this.tagInput.nativeElement.value = ''
  }
}
