#!/usr/bin/env ruby
# Convert registered_vehicle_maintenance_workshops.csv to JSON for fast loading.
# Run: ruby car/scripts/csv_to_json.rb

require "csv"
require "json"

project_root = File.expand_path("../..", __dir__)
csv_path = File.join(project_root, "registered_vehicle_maintenance_workshops.csv")
json_path = File.join(project_root, "car", "workshops.json")

csv_text = File.read(csv_path, encoding: "UTF-8")
csv_text = csv_text.delete_prefix("\uFEFF") # strip BOM if present

rows = CSV.parse(csv_text, headers: true, liberal_parsing: true)
arr = rows.map(&:to_h)

File.write(json_path, JSON.generate(arr), encoding: "UTF-8")
puts "Wrote #{arr.size} workshops to #{json_path}"
