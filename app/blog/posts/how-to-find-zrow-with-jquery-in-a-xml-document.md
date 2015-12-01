# How to find z:row with jQuery in a XML document
Have you tried getting z:row from a SharePoint ajax request, but got problems when you tried parsing it with jQuery.

This works with jQuery 1.8.3, because in jQuery 1.9.1 there was an error which made jQuery not return a xml document when you made a Ajax request.

The problem is that even through jQuery was sopposed to grain out browser differences, it has not succed in every area.

In Chrome with jQuery 1.8.3 this works:
`jQuery(xml).find("row")`

In Internet Explorer with jQuery 1.8.3 this works:
`jQuery(xml).find("z\\:row");`

So to get a even browser experience you can do this:
`var nodes = (jQuery(xml).find("row").length !== 0) ? jQuery(xml).find("row") : jQuery(xml).find("z\\:row");`