require 'httparty'

class TeamsController < ApplicationController
  before_action :allow_teams_iframe

  def register

  end

  def register_class
    render permission_denied unless access_token
    courses_url = base_canvas_uri()
    courses_url.path = '/api/v1/courses'
    courses_url.query = 'enrollment_type=teacher'
    response = HTTParty.get(
      courses_url.to_s,
      headers: {'Authorization' => "Bearer #{access_token}"}
    )

    courses = JSON.parse(response.body)
    render locals: { courses: courses }
  end

  private

  def allow_teams_iframe
    response.headers['X-Frame-Options'] = 'ALLOW-FROM https://teams.microsoft.com'
  end

  def base_canvas_uri
    URI(session['user']['canvas_host'])
  end
end
