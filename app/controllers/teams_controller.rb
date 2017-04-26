class TeamsController < ApplicationController
  before_action :allow_teams_iframe

  def register

  end

  def register_class

  end

  private

  def allow_teams_iframe
    response.headers['X-Frame-Options'] = 'ALLOW-FROM https://teams.microsoft.com'
  end
end
