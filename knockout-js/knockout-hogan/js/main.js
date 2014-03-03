$(window).load(function() {
  // Render Hogan.js template
  var templateName = 'person-template';
  var scriptTemplate = $('#' + templateName).html();
  var compiledTemplate = Hogan.compile(scriptTemplate);
  var renderedTemplate = compiledTemplate.render();

  // Add rendered template with Hogan.js to Knockout
  ko.templates[templateName] = renderedTemplate;

  // Create a view model (VM)
  function MyViewModel() {
    this.buyer = {name: 'Benny', credits: 250};
    this.seller = {name: 'Mario', credits: 5800};
  }

  // Bind the VM (which uses a template)
  ko.applyBindings(new MyViewModel());
});

