# Hours-per-Project-Calculator-Jquery

Live link to try the project: https://davidhct.github.io/Hours-per-Project-Calculator-Jquery/

### Summary

The Hours per Project Calculator application is a single-page application (SPA) that allows you to Write down work hours and the name of a project, when during your work day you work on several projects in separate hours, and you need to write down how much time you worked on each project and how long you took a break. So instead of calculating the hours and wasting time on it, you can use the app, and it calculates for you the amount of hours you worked on the projects including calculating the breaks.<br>

### Algorithm

Receiving two inputs (hours) is called the left input A and the right input B.<br>
`if (minuteA > minuteB) {<br> newHour = (hourB - hourA) -1;<br> newMinute = 60 - (minuteA - minuteB);<br> } else if (minuteA <= minuteB) {<br> newHour = hourB - hourA;<br> newMinute = minuteB - minuteA;<br> }`

#### The purpose of this project is:

- To practice jQuery.
- To solve a problem.

<kbd><img src="/demo images/img_1.png" width="630" height="300"></kbd><br>
<kbd><img src="/demo images/img_2.png" width="630" height="300"></kbd><br>
<kbd><img src="/demo images/img_3.png" width="630" height="300"></kbd>
