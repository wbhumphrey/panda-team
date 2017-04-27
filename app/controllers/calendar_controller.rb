require 'httparty'

class CalendarController < ApplicationController
  before_action :allow_teams_iframe

  def index

  end

  private

  def allow_teams_iframe
    response.headers['X-Frame-Options'] = 'ALLOW-FROM https://teams.microsoft.com'
  end

  def base_canvas_uri
    URI(session['user']['canvas_host'])
  end
end
