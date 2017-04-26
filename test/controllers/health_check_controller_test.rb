require 'test_helper'

class HealthCheckControllerTest < ActionDispatch::IntegrationTest
  test "should get show" do
    get health_check_show_url
    assert_response :success
  end

end
