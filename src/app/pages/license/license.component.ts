import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-license',
  templateUrl: './license.component.html',
  styleUrls: ['./license.component.scss']
})
export class LicenseComponent implements OnInit {

  @Input() close;

  constructor() { }

  ngOnInit() {
  }

  license = {
    Permissions: [
      ["Commercial use", "This software and derivatives may be used for commercial purposes."],
      ["Modification", "This software may be modified."],
      ["Distribution", "This software may be distributed."],
      ["Patent use", "This license provides an express grant of patent rights from contributors."],
      ["Private use", "This software may be used and modified in private."]
    ],
    Limitations: [
      ["Liability", "This license includes a limitation of liability."],
      ["Warranty", "The license explicitly states that it does NOT provide any warranty."]
    ],
    Conditions: [
      ["License and copyright notice", "A copy of the license and copyright notice must be included with the software."],
      ["State changes", "Changes made to the code must be documented."],
      ["Disclose source", "Source code must be made available when the software is distributed."],
      ["Same license", "Modifications must be released under the same license when distributing the software. In some cases a similaror related license may be used."]
    ]
  }

}
