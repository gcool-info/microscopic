Template.projectEdit.events({ 
    'submit': function(e) {
        e.preventDefault();
        var currentProjectId = this._id;
        var projectProperties = {
            title: $(e.target).find('[name=title]').val(), 
            baseline: $(e.target).find('[name=baseline]').val(),
            edition: $(e.target).find('[id=edition]').val()
        };
        Projects.update(currentProjectId, {$set: projectProperties}, function(error) { if (error) {
            // display the error to the user
            alert(error.reason); } else {
                Router.go('projectPage', {_id: currentProjectId});
            }
        }); },
    'click .delete': function(e) { e.preventDefault();
        if (confirm("Delete this project?")) {
            var currentProjectId = this._id;
            Projects.remove(currentProjectId);
            projectCount = projectCount - 1;
            Router.go('projectsList');
        }
    },
    'click .cancel': function(e) { 
        e.preventDefault();
        Router.go('projectPage', {_id: this._id});
    },
    'click .add-tag': function(e) {
        var currentProjectId = this._id;
        var new_tag = $(e.target).parent().find('[id=tagbox]').val();
        Projects.update({_id:currentProjectId}, {$push: {tags: new_tag}});
        $('#tagbox').val('');
    }
});