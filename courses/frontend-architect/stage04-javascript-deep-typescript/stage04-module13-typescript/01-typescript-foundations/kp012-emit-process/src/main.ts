type CourseConfig = {
  title?: string;
  nested?: {
    enabled?: boolean;
  };
};

const config: CourseConfig = {
  nested: {}
};

const title = config.title?.trim() ?? 'Untitled course';
const enabled = config.nested?.enabled ?? false;

console.log(`${title} | enabled=${enabled}`);
