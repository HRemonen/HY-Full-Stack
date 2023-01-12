# CI/CD in Python

## Tools
* Linting: Python has a package called Pylint which is installable from the pip for your Python projects. Other used tool for linting is Flake8 in Python.
* Testing: Well it really depends what are we testing here. For unittesting and integration testing Python has really good frameworks such as unittest or PyTest. If we would like to test functionality or end-2-end testing Robot framework is really good for that. Also Python has various BDD testing frameworks such as Lettuce or Behave.
* Building: I came across a tool called PyBuilder for building Python projects.

## CI alternatives
On the top of my head I can think of one and that is CircleCI. Circle can also be integrated with GitHub or Bitbucket when new code is commited. Perhaps CircleCI is the most obvious alternative for Github Actions.

GitLab the notorious alternative for GitHub also has their own CI/CD solution just like GitHub Actions.

## Cloud or local

I think it comes to the complexity and size of the project. If it is not really anything demanding we would be working on then I would argue that cloud based CI/CD pipeline would be the best choice for us. They are easy to use and does not need any hassle with the hardware etc. and after all it really comes down to that it gets the job done as expected.

If we were building something with really heavy tests or something like that I would probably dig little deeper into the whole self-hosted option. Because there might be more demanding configuration that is needed or we need more torgue of the whole system. I think that is where self-hosted comes first.

