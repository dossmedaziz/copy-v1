import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2'
import { ConfigService } from 'src/app/services/config.service';
import { QuoteService } from 'src/app/services/quote.service';
@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.css']
})
export class QuoteComponent implements OnInit {
  selectedquote
  number
  quotes
  years = Array()
  year
  thisyear
  num = 0
  search
  searchKey
  allquotes = Array()
  selectedYear = new Date().getFullYear()

  constructor(private quoteService: QuoteService
    , private toastr: ToastrService,
    private configService: ConfigService,
    private router: Router) { }


    async ngOnInit() {

      for ( let i = 2017 ;  i < 2050 ; i++  )
      {
        this.years.push({
         year : i
        })
      }
      await this.quoteService.getQuotes().then(
        res=>{
          this.allquotes = res.quotes
          this.quotes = res.quotes
          
            },err=>{
          console.log(err)
        }
      )
      await this.filterByYear()
     
  
    }

  addQuote() { this.router.navigate(['/addQuote']) }
  updatequote(id) { this.router.navigate(['/updateQuote', id]) }
  deleteQuote() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do You Really Want To Delete The quotes!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {

        let quotes_id = []
        this.selectedquote.map(el => {
          quotes_id.push({
            "quote_id": el.id
          })
        })
        this.quoteService.deleteQuote(quotes_id).subscribe(
          res => {
            this.toastr.success('Quotes is deleted')
            this.ngOnInit()
          }, err => {
            console.log(err)
          }
        )
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success',
        )

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your file is safe :)',
          'error'
        )
      }
    })
  }
  filterActions(action_name, space_name) {
    if (this.configService.filterActions(action_name, space_name)) {
      return true
    } else {
      return false
    }
  }

  async filterByYear() {

    this.allquotes = []
    await this.quotes.map(el => {
      let year = new Date(el.DateFacturation).getFullYear()
      if (year == this.selectedYear) 
      {
        this.allquotes.push(
          el
        )
      }

    });
  }

}
